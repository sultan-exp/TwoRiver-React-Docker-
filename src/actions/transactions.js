import axios from "axios";
import map from "lodash/map";
import reverse from "lodash/reverse";
import times from "lodash/times";
import max from "lodash/max";
import groupBy from "lodash/groupBy";
import sum from "lodash/sum";
import take from "lodash/take";
import sortBy from "lodash/sortBy";
import flatMap from "lodash/flatMap";
import mapValues from "lodash/mapValues";
import filter from "lodash/filter";
import { baseUrl } from "../config";
import subDays from "date-fns/subDays";
import parseISO from "date-fns/parseISO";
import _format from "date-fns/format";
import isBefore from "date-fns/isBefore";
import { auth } from "./auth-helper";
import Moment from "react-moment";
import moment from "moment-timezone";
const Papa = require("papaparse");

function toDate(...input) {
  try {
    return parseISO(...input);
  } catch (e) {
    console.error(e);
  }
}
function format(d, f) {
  try {
    return _format(d, f);
  } catch (e) {
    console.error(e);
  }
}

const makeDailySalesData = (salesByDay) => {
  const dates = reverse(
    map(times(7), (num) => {
      const d = subDays(new Date(), num);
      return d;
    })
  );
  const chart_data = map(dates, (d) => {
    const day_key = format(d, "DDDD");
    return {
      label: format(d, "ddd"),
      value: salesByDay[day_key] || 0,
    };
  });
  return {
    data: {
      labels: map(chart_data, "label"),
      series: [map(chart_data, "value")],
    },
    high: Math.round(max(map(chart_data, "value") * 1.05)),
  };
};

const calculateTopProducts = (sales) => {
  // 1. Find top 3 Products
  const salesByProduct = groupBy(sales, "memo");

  const totalRevenueByProduct = map(
    salesByProduct,
    (productSales, productName) => {
      return {
        total_sales: sum(
          map(productSales, (r) => parseFloat(r.total_amount_USD))
        ),
        name: productName,
      };
    }
  );

  const top3Products = take(
    reverse(sortBy(totalRevenueByProduct, "total_sales")),
    3
  );
  const date = new Date();
  const dates = reverse(
    map(times(30), (num) => {
      const d = subDays(
        new Date(
          `${
            date.getMonth() + 1
          } ${date.getDate()}, ${date.getFullYear()} 23:59:59`
        ),
        num
      );

      return d;
    })
  );

  const makeChartForProduct = (productName) => {
    const chart_data = map(dates, (d) => {
      const productSales = salesByProduct[productName];
      const previous_sales = filter(productSales, (sale) => {
        const [splitDate] = sale.created_at.split(".");

        const sale_date = toDate(splitDate);
        return isBefore(sale_date, d);
      });
      const allsum = sum(
        map(previous_sales, (r) => parseFloat(r.total_amount_USD))
      );
      return allsum;
    });

    return chart_data;
  };

  const series = map(top3Products, (p) => makeChartForProduct(p.name));
  const labels = map(dates, (d) => format(d, "dd"));
  return {
    data: {
      series,
      labels,
    },
    names: map(top3Products, "name"),
    high: Math.round(max(flatMap(series)) * 1.05),
  };
};

const groupDataByFormat = (data, f) => {
  const groupedBy = groupBy(data, (row) => {
    const [splitDate] = row.created_at.split(".");
    const d = toDate(splitDate);
    const the_day = format(d, f);
    return the_day;
  });

  const sumBy = mapValues(groupedBy, (g) => {
    const values = map(g, (r) => parseFloat(r.total_amount_USD));
    return sum(values);
  });
  return sumBy;
};

const papaparse = (data, dispatch) => {
  let cards_type_summary = {};
  let emails_summary = {};
  let promocode_summary = {};
  let invoice_id_summary = {};
  let all_items = [];
  let zip_summary = {};
  Papa.parse(data, {
    //worker: true,
    header: true,
    step: function (results) {
      const item = results.data[0];
      all_items.push(item);
      // summarize by card type
      if (item.resp_card_type) {
        item.card_type = item.resp_card_type.toUpperCase();
        if (!cards_type_summary[item.card_type]) {
          cards_type_summary[item.card_type] = {};
          cards_type_summary[item.card_type]["name"] = item.card_type;
          cards_type_summary[item.card_type]["amount"] = 0;
          cards_type_summary[item.card_type]["count"] = 0;
        }
        cards_type_summary[item.card_type]["amount"] =
          cards_type_summary[item.card_type]["amount"] +
          parseFloat(item.total_amount_USD);
        cards_type_summary[item.card_type]["count"]++;
      }

      //summary by invoice ID
      if (item.memo) {
        if (!invoice_id_summary[item.memo]) {
          invoice_id_summary[item.memo] = {};
          invoice_id_summary[item.memo]["name"] = item.memo;
          invoice_id_summary[item.memo]["amount"] = 0;
          invoice_id_summary[item.memo]["count"] = 0;
        }
        invoice_id_summary[item.memo]["amount"] =
          invoice_id_summary[item.memo]["amount"] +
          parseFloat(item.total_amount_USD);
        invoice_id_summary[item.memo]["count"]++;
      }

      // summarize by email
      if (item.email) {
        if (!emails_summary[item.email]) {
          emails_summary[item.email] = {};
          emails_summary[item.email]["amount"] = 0;
          emails_summary[item.email]["count"] = 0;
          emails_summary[item.email]["zipcode"] = "";
        }
        emails_summary[item.email]["amount"] =
          emails_summary[item.email]["amount"] +
          parseFloat(item.total_amount_USD);
        emails_summary[item.email]["count"]++;
        emails_summary[item.email]["zipcode"] = item.zipcode;
      }

      // summarize by promocode
      if (item.promocode) {
        if (!promocode_summary[item.promocode]) {
          promocode_summary[item.promocode] = {};
          promocode_summary[item.promocode]["amount"] = 0;
          promocode_summary[item.promocode]["count"] = 0;
        }
        promocode_summary[item.promocode]["amount"] =
          promocode_summary[item.promocode]["amount"] +
          parseFloat(item.total_amount_USD);
        promocode_summary[item.promocode]["count"]++;
      }
      if (item.zipcode) {
        if (!zip_summary[item.zipcode]) {
          zip_summary[item.zipcode] = {
            amount: 0,
            count: 0,
          };
        }
        zip_summary[item.zipcode]["amount"] += parseFloat(
          item.total_amount_USD
        );
        zip_summary[item.zipcode]["count"]++;
      }
    },
    complete: (results) => {
      try {
        const filtered = filter(all_items, (r) => !!r.created_at);

        const sumByWeek = groupDataByFormat(filtered, "w");
        const sumByDay = groupDataByFormat(filtered, "DDDD");

        const daily_chart_data = makeDailySalesData(sumByDay);
        const top3_chart_data = calculateTopProducts(filtered);

        const card_summary_sum = sum(map(cards_type_summary, "amount"));
        const invoice_id_summary_sum = sum(map(invoice_id_summary, "amount"));
        const transactions_count = sum(map(cards_type_summary, "count"));
        const summary_with_percentage = map(cards_type_summary, (row) => {
          const percentage = Math.round((row.amount / card_summary_sum) * 100);
          return {
            card_type: row.name,
            amount: row.amount,
            count: row.count,
            percentage,
          };
        });
        const invoice_summary_with_percentage = map(
          invoice_id_summary,
          (row) => {
            const percentage = Math.round(
              (row.amount / invoice_id_summary_sum) * 100
            );
            return {
              name: row.name,
              amount: row.amount,
              count: row.count,
              percentage,
            };
          }
        );

        dispatch({
          type: "GET_SERIES_TRANSACTIONS_SUCCESS",
          payload: {
            card_summary: summary_with_percentage,
            emails_summary,
            promocode_summary,
            zip_summary,
            sumByWeek,
            sumByDay,
            all_items,
            invoice_id_summary,
            invoice_summary_with_percentage,
            total_sum: card_summary_sum,
            avg_ticket_price: Math.round(card_summary_sum / transactions_count),
            daily_chart_data,
            top3_chart_data,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
};

export const getMyTransactions =
  (merchant_name = "") =>
  async (dispatch) => {
    dispatch({ type: "GET_TRANSACTIONS_PENDING" });
    return axios({
      url: `${baseUrl}/me/transactions?merchant_id=${auth.getMerchantId()}`,
      method: "get",
    })
      .then(async ({ data }) => {
        let results = [];
        results = data.results;
        let res = data;
        while (res.next != null) {
          res = await loadMoreTransactions(res.next);
          results = results.concat(res.results);

          res.results = results;
          dispatch({
            type: "GET_TRANSACTIONS_SUCCESS",
            payload: res,
          });
        }
        // res.results = results;
        // dispatch({
        //   type: "GET_TRANSACTIONS_SUCCESS",
        //   payload: res,
        // });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: "GET_TRANSACTIONS_FAILURE",
          payload: {
            data: err,
          },
        });
      });
  };

export const getMobileMoneyTransactions = () => async (dispatch) => {
  dispatch({ type: "GET_MOBILE_MONEY_TRANSACTIONS_PENDING" });
  return axios({
    url: `${baseUrl}/mobile-money/charge`,
    method: "get",
  })
    .then(async ({ data }) => {
      let results = [];
      results = data.results;

      let res = data;
      while (res.next != null) {
        res = await loadMoreTransactions(res.next);
        results = results.concat(res.results);
      }
      res.results = results;
      dispatch({
        type: "GET_MOBILE_MONEY_TRANSACTIONS_SUCCESS",
        payload: res,
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: "GET_MOBILE_MONEY_TRANSACTIONS_FAILURE",
        payload: {
          data: err,
        },
      });
    });
};

const loadMoreTransactions = (url) => {
  return axios({
    url: url,
    method: "get",
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTransactionsSeries =
  (merchant_name = "") =>
  async (dispatch) => {
    dispatch({ type: "GET_TRANSACTIONS_PENDING" });
    return axios({
      url: `${baseUrl}/me/series-transactions?merchant_id=${auth.getMerchantId()}`,
      method: "get",
    })
      .then(({ data }) => {
        //dispatch action to redux store
        papaparse(data, dispatch);
        return data;
      })
      .catch((err) => {
        dispatch({
          type: "GET_SERIES_TRANSACTIONS_FAILURE",
          payload: {
            data: err,
          },
        });
      });
  };

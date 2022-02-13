import { useEffect } from "react";
import {
  // Link as RouterLink,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import {
  // Avatar,
  Box,
  // Button,
  // Divider,
  Drawer,
  Hidden,
  List,
  // Typography
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith'
// };

const items = [
  {
    href: "/#payments", // '/app/dashboard'
    icon: BarChartIcon,
    title: "Payments",
  },
  {
    href: "/#send-money", // '/app/customers'
    icon: UsersIcon,
    title: "Send Money",
  },

  {
    href: "/login", // '/login'
    icon: LockIcon,
    title: "Login",
  },
  {
    href: "/pay-bill", // '/login'
    icon: LockIcon,
    title: "Pay",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;

import React from "react";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as GrIcons from "react-icons/gr";

const iconStyles = { color: "white", fontSize: "1.8em" };
const innerIconStyles = { fontSize: "1.2em" };

const HolidaySidebarData = [
  {
    title: "Mark Holidays",
    icon: <RiIcons.RiCalendar2Fill style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    path: "/system/holiday/holidays",
  },
];

export default HolidaySidebarData;

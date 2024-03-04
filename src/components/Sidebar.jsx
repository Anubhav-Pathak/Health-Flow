"use client";
import Link from "next/link";

const Sidebar = ({ userType }) => {
  const menuItems = [
    {
      text: "Doctor Dashboard",
      icon: "->",
      link: "/dashboard/doctor",
      userType: "doctor",
    },
    {
      text: "Add Report",
      icon: "->",
      link: "/dashboard/doctor/report",
      userType: "doctor",
    },
    {
      text: "User Reports",
      icon: "->",
      link: "/dashboard/user/John Doe",
      userType: "user",
    },
    {
      text: "QR Scanner",
      icon: "->",
      link: "/dashboard/user/scan",
      userType: "user",
    },
    { text: "Logout", icon: "->", link: "/", userType: "*" },
  ];

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-success drawer-button mb-2"
        >
          {"+"}
        </label>
        <div className="flex flex-col gap-2 items-stretch">
          {menuItems
            .filter(
              (item) => item.userType === userType || item.userType === "*"
            )
            .map((item, index) => (
              <Link key={index} href={item.link}>
                <div
                  key={index}
                  className={`btn ${
                    item.userType === "*" ? "btn-warning" : "btn-error"
                  }`}
                >
                  {item.text.charAt(0)}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="drawer-side drawer-open z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className={`menu p-4 min-h-full bg-red-200`}>
          {menuItems
            .filter(
              (item) => item.userType === userType || item.userType === "*"
            )
            .map((item, index) => (
              <li
                key={index}
                className={`m-2 rounded-md text-white ${
                  item.userType === "*" ? "bg-warning" : "bg-error"
                }`}
              >
                <Link href={item.link}>{item.text}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import { Link, NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiBillLine } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import { BsBox, BsCartCheck } from "react-icons/bs";
import { HiOutlineClipboardCheck, HiOutlineUsers } from "react-icons/hi";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const routes_1 = [
  {
    path: "/items",
    name: "Items",
    icon: <BsBox size={30} />,
  },
];
const routes_2 = [
  {
    path: "/sales",
    name: "Sales",
    icon: <HiOutlineClipboardCheck size={30} />,
  },
  {
    path: "/purchase",
    name: "Purchase",
    icon: <BsCartCheck size={30} />,
  },
  {
    path: "/cashbook",
    name: "Cashbook",
    icon: <RiBillLine size={30} />,
  },
];
const routes_3 = [
  {
    path: "/customers",
    name: "Customers",
    icon: <HiOutlineUsers size={30} />,
  },
 
];
const routes_4 = [
  {
    path: "/suppliers",
    name: "Suppliers",
    icon: <FiTruck size={30} />,
  },
];
const routes_5 = [
  {
    path: "/profile",
    name: "Profile ",
    icon: <BiUserCircle size={30} />,
  },
];
const ros = [
  {
    path: "/items",
    name: "Items",
    icon: <BsBox size={30} />,
  },
  {
    path: "/sales",
    name: "Sales",
    icon: <HiOutlineClipboardCheck size={30} />,
  },
  {
    path: "/purchase",
    name: "Purchase",
    icon: <BsCartCheck size={30} />,
  },
  {
    path: "/cashbook",
    name: "Cashbook",
    icon: <RiBillLine size={30} />,
  },

  {
    path: "/customers",
    name: "Customers",
    icon: <HiOutlineUsers size={30} />,
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    icon: <FiTruck size={30} />,
  },
  {
    path: "/profile",
    name: "Profile ",
    icon: <BiUserCircle size={30} />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  // return (
  //   <>
  //

  //        <section className="routes">
  //           {routes.map((route) => {

  //             return (
  //               <NavLink
  //                 to={route.path}
  //                 key={route.name}
  //                 className="link"
  //                 activeClassName="active"
  //               >
  //                 <div className="icon">{route.icon}</div>
  //                 <AnimatePresence>
  //                   {isOpen && (
  //                     <motion.div
  //                       variants={showAnimation}
  //                       initial="hidden"
  //                       animate="show"
  //                       exit="hidden"
  //                       className="link_text"
  //                     >
  //                       {route.name}
  //                     </motion.div>
  //                   )}
  //                 </AnimatePresence>
  //               </NavLink>
  //             );
  //           })}
  //         </section>
  //         </motion.div>

return (
<>
  <div className="main-container">
    <motion.div
      animate={{
        width: isOpen ? "250px" : "75px",
        transition: {
          duration: 0.5,
          type: "spring",
          damping: 10,
        },
      }}
      className={`sidebar `}
     >
      <div className="top_section">
        <img src="GPN_Logo-GBH.png"  alt="logo" className="gpn" onClick={toggle} />
        <AnimatePresence>
          {isOpen && (
            <motion.h1
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="logo"
              // onClick={toggle}
            ><Link className="navbar-brand" style={{ color: "white"  }} to="/">
             <b> GrahakBhandar </b>
              </Link>
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
      <section className="ros">
        {!isOpen &&
          ros.map((route, index) => {
            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeClassName="active"
              >
                <div className="icn">{route.icon}</div>
              </NavLink>
            );
          })}
          </section>
          <section className="routes">
        {isOpen &&
          routes_1.map((route) => {
            return (<>
             <AnimatePresence>
               
               {isOpen && (
                 <motion.div
                   variants={showAnimation}
                   initial="hidden"
                   animate="show"
                   exit="hidden"
                   className="text"
                 >
                  <b>MANAGE INVENTORY</b>
                 </motion.div>
               )}
             </AnimatePresence>
              <NavLink
                to={route.path}
                key={route.name}
                className="link"
                activeClassName="active"
              >
                
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
               
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
               <AnimatePresence>
               
               {isOpen && (
                 <motion.div
                   variants={showAnimation}
                   initial="hidden"
                   animate="show"
                   exit="hidden"
                   className="text"
                 >
                  <b>TRANSACTIONS</b>
                 </motion.div>
               )}
             </AnimatePresence>
              </>
            );
          })}
          {isOpen &&
          routes_2.map((route) => {
            return (<>
            
              <NavLink
                to={route.path}
                key={route.name}
                className="link"
                activeClassName="active"
              >
                
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
               
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
              
              </>
              
            );
          })
          }
          
          {isOpen &&
          routes_3.map((route) => {
            
            return (<> <AnimatePresence>
               
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text"
                >
                 <b>PARTIES</b>
                </motion.div>
              )}
            </AnimatePresence>
            
              <NavLink
                to={route.path}
                key={route.name}
                className="link"
                activeClassName="active"
              >
                
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
               
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
              </>
            );
          })}
          {isOpen &&
          routes_4.map((route) => {
            
            return (<> 
            
              <NavLink
                to={route.path}
                key={route.name}
                className="link"
                activeClassName="active"
              >
                
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
               
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
              </>
            );
          })}
          {isOpen &&
          routes_5.map((route) => {
            
            return (<> 
            <AnimatePresence>
               
               {isOpen && (
                 <motion.div
                   variants={showAnimation}
                   initial="hidden"
                   animate="show"
                   exit="hidden"
                   className="text"
                 >
                  <b>USER</b>
                 </motion.div>
               )}
             </AnimatePresence>
              <NavLink
                to={route.path}
                key={route.name}
                className="link"
                activeClassName="active"
              >
                
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
               
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
              </>
            );
          })}
      </section>
    </motion.div>

    <main>{children}</main>
  </div>
</>
)
};

export default SideBar;

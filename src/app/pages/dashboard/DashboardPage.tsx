import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import * as Widget from "../../../_metronic/partials/widgets";

const DashboardPage: FC = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Content>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
          }}
        >
          <div onClick={() => handleClick("/")}>
            <Widget.StatisticsWidget5
              className="card bg-success hoverable card-xl-stretch mb-xl-8"
              color="primary"
              svgIcon="logistic"
              iconColor="white"
              title="All Users"
              titleColor="white"
              description="All users can access this page"
              descriptionColor="white"
            />
          </div>
          <div onClick={() => handleClick("/overview")}>
            <Widget.StatisticsWidget5
              className="card bg-warning hoverable card-xl-stretch mb-xl-8"
              color="primary"
              svgIcon="key-square"
              iconColor="white"
              title="Admin only"
              titleColor="white"
              description="Only Admin can access this page"
              descriptionColor="white"
            />
          </div>
        </div>
      </Content>
    </>
  );
};

// const DashboardPageTest: FC = () => (
//   <>
//     {/* <ToolbarWrapper /> */}
//     <Content>
//       {/* <div className="row g-5 g-xl-10 mb-5 mb-xl-10"> */}
//       {/* <div className="col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10"> */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gridGap: "20px",
//         }}
//       >
//         <div>
//           <Widget.CardsWidget20
//             className="h-md-50 mb-5 mb-xl-10 min-h-100"
//             description="Active Projects"
//             color="#F1416C"
//             img={toAbsoluteUrl("media/patterns/vector-1.png")}
//           />
//         </div>
//         <div>
//           <Widget.CardsWidget7
//             className="h-md-50 mb-5 mb-xl-10 min-h-100"
//             description="Professionals"
//             icon={false}
//             stats={357}
//             labelColor="dark"
//             textColor="gray-300"
//           />
//         </div>
//       </div>

//       {/* <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
//           <Widget.CardsWidget17 className="h-md-50 mb-5 mb-xl-10" />
//           <Widget.ListsWidget26 className="h-lg-50" />
//       </div> */}

//       {/* <div className="col-xxl-6">
//           <Widget.EngageWidget10 className="h-md-100" />
//         </div> */}
//       {/* </div> */}

//       {/* <div className="row gx-5 gx-xl-10">
//         <div className="col-xxl-6 mb-5 mb-xl-10"></div>

//         <div className="col-xxl-6 mb-5 mb-xl-10"></div>
//       </div> */}

//       {/* <div className="row gy-5 gx-xl-8">
//         <div className="col-xxl-4">
//           <Widget.ListsWidget3 className="card-xxl-stretch mb-xl-3" />
//         </div>
//         <div className="col-xl-8">
//           <Widget.TablesWidget10 className="card-xxl-stretch mb-5 mb-xl-8" />
//         </div>
//       </div> */}

//       {/* <div className="row gy-5 g-xl-8">
//         <div className="col-xl-4">
//           <ListsWidget2 className="card-xl-stretch mb-xl-8" />
//         </div>
//         <div className="col-xl-4">
//           <ListsWidget6 className="card-xl-stretch mb-xl-8" />
//         </div>
//         <div className="col-xl-4">
//           <ListsWidget4 className="card-xl-stretch mb-5 mb-xl-8" items={5} />
//         </div>
//       </div> */}

//       {/* <div className="row g-5 gx-xxl-8">
//         <div className="col-xxl-4">
//           <Widget.MixedWidget8 className="card-xxl-stretch mb-xl-3" chartColor="success" chartHeight="150px" />
//         </div>
//         <div className="col-xxl-8">
//           <Widget.TablesWidget5 className="card-xxl-stretch mb-5 mb-xxl-8" />
//         </div>
//       </div> */}
//     </Content>
//   </>
// );

export default DashboardPage;

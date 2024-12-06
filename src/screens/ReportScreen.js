import React from "react";
import Layout from "../components/layout/Layout";
import ReportHeader from "../components/reports/ReportHeader";
import ReportList from "../components/reports/ReportList";

export default function ReportScreen() {
  return (
    <Layout title={"Reports"} load={true}>
      <div>
        {/* Wrapping the ReportHeader component in a try-catch block to handle rendering errors */}
        {(() => {
          try {
            return <ReportHeader />;
          } catch (error) {
            console.error("Error rendering ReportHeader: ", error);
            return (
              <div style={{ color: "red" }}>
                An error occurred while loading the report header.
              </div>
            );
          }
        })()}

        {/* Wrapping the ReportList component in a try-catch block to handle rendering errors */}
        {(() => {
          try {
            return <ReportList />;
          } catch (error) {
            console.error("Error rendering ReportList: ", error);
            return (
              <div style={{ color: "red" }}>
                An error occurred while loading the report list.
              </div>
            );
          }
        })()}
      </div>
    </Layout>
  );
}

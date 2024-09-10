import React from 'react';
import CountUp from 'react-countup';
import TinyLineChart from 'Components/Charts/TinyLineChart';
import ChartConfig from 'Constants/chart-config';
import IntlMessages from 'Util/IntlMessages';
import { Link } from "react-router-dom";
import { RctCardContent, RctCard, RctCardFooter } from 'Components/RctCard';

const Expenses = ({ label, chartdata, labels, value }) => (
    <RctCard>
        <div className="rct-block-title d-flex justify-content-center" style={{cursor:'pointer',textAlign:'center'}}>
            <Link to='enquiry/overdue'>
                <div className="d-flex align-items-start">
                    <h4><IntlMessages id="Overdue Enquires" /></h4>
                </div>
                <div className="align-items-end">
                    <span className="d-block text-muted counter-point"><CountUp start={0} end={localStorage.getItem("overdue_enquiry")} duration={3} useEasing={true} /></span>
                    <p className="text-right mb-0 text-muted"></p>
                </div>
            </Link>
        </div>
        {/* <RctCardContent noPadding>
            <TinyLineChart
                label={label}
                chartdata={chartdata}
                labels={labels}
                borderColor={ChartConfig.color.warning}
                pointBackgroundColor={ChartConfig.color.warning}
                height={100}
                pointBorderColor={ChartConfig.color.white}
                borderWidth={4}
            />
        </RctCardContent> */}
    </RctCard>
);

export default Expenses;

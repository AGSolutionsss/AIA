import React from 'react';
import CountUp from 'react-countup';
import TinyLineChart from 'Components/Charts/TinyLineChart';
import ChartConfig from 'Constants/chart-config';
import IntlMessages from 'Util/IntlMessages';
import { Link } from "react-router-dom";
import { RctCard, RctCardFooter, RctCardContent } from 'Components/RctCard';

const PendingRequest = ({ label, chartdata, labels, value }) => (
    <RctCard>
        <div className="rct-block-title d-flex justify-content-center" style={{cursor:'pointer',textAlign:'center'}}>
            <Link to='request/listing'>
                <div className="d-flex align-items-start">
                    <h4><IntlMessages id="Pending Request" /></h4>
                </div>
                <div className="align-items-end">
                    <span className="d-block text-muted counter-point"><CountUp start={0} end={localStorage.getItem("pending_request")} duration={3} useEasing={true} /></span>
                    <p className="text-right mb-0 text-muted"></p>
                </div>
            </Link>
        </div>
        {/* <RctCardContent noPadding>
            <TinyLineChart
                label={label}
                chartdata={chartdata}
                labels={labels}
                borderColor={ChartConfig.color.default}
                pointBackgroundColor={ChartConfig.color.default}
                height={100}
                pointBorderColor="#FFFFFF"
                borderWidth={4}
            />
        </RctCardContent> */}
        
    </RctCard>
);

export default PendingRequest;

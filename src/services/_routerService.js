import Widgets from "Routes/widgets";
import AdvanceUIComponents from "Routes/advance-ui-components";
import ChartsComponents from "Routes/charts";
import Components from "Routes/components";
import Icons from "Routes/icons";
import Dashboard from "Routes/dashboard";
import Crm from "Routes/crm";
import Maintenance from "../container/Maintenance";
import UserProfile from "../routes/userProfile/index";
import { AsyncAboutUsComponent } from "Components/AsyncComponent/AsyncComponent";
import NewListEnquiry from "../routes/enquiry/index";
import NewListStudent from "../routes/student/index";
import NewListClass from "../routes/class/index";
import NewListCountry from "../routes/country/index";
import NewListRequest from "../routes/request/index";
import EnquiryDownload from "../routes/downloads/enquiry/index";
import StudentDownload from "../routes/downloads/student/index";
import DeliveryDownload from "../routes/downloads/delivery/index";
import ExamDownload from "../routes/downloads/exam/index";
import AttendanceDownload from "../routes/downloads/attendance/index";
import NewListDelivery from "../routes/delivery/index";
import NewListNotification from "../routes/notification/index";
import NewListTaskManager from "../routes/taskmanager/index";

export default [{
        path: "dashboard",
        component: Dashboard,
    },
    {
        path: "crm",
        component: Crm,
    },
    {
        path: "widgets",
        component: Widgets,
    },
    {
        path: "icons",
        component: Icons,
    },
    {
        path: "about-us",
        component: AsyncAboutUsComponent,
    },
    {
        path: "charts",
        component: ChartsComponents,
    },
    {
        path: "ui-components",
        component: Components,
    },
    {
        path: "advanced-component",
        component: AdvanceUIComponents,
    },
    {
        path: "maintenance",
        component: Maintenance,
    },
    {
        path: "users",
        component: UserProfile,
    },
    {
        path: "enquiry",
        component: NewListEnquiry,
    },
    {
        path: "student",
        component: NewListStudent,
    },
    {
        path: "class",
        component: NewListClass,
    },
    {
        path: "country",
        component: NewListCountry,
    },
    {
        path: "request",
        component: NewListRequest,
    },
    {
        path: "download-enquiry",
        component: EnquiryDownload,
    },
    {
        path: "download-student",
        component: StudentDownload,
    },
    {
        path: "download-delivery",
        component: DeliveryDownload,
    },
    {
        path: "download-exam",
        component: ExamDownload,
    },
    {
        path: "download-attendance",
        component: AttendanceDownload,
    },
    {
        path: "delivery",
        component: NewListDelivery,
    },
    {
        path: "notification",
        component: NewListNotification,
    },
    {
        path: "taskmanager",
        component: NewListTaskManager,
    },
];
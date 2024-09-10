export default {
    //User
    category1: [
        
    ],
    //Sales
    category2: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Country",
            menu_icon: "zmdi zmdi-flag",
            path: "/app/country",
            child_routes: null,
        },
        {
            menu_title: "Enquiry",
            menu_icon: "zmdi zmdi-accounts",
            path: "",
            child_routes:[
                {
                    menu_title: "Open List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry",
                    child_routes: null,
                },
                {
                    menu_title: "Overdue List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry/overdue",
                    child_routes: null,
                },
                {
                    menu_title: "Close List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry/close",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Student",
            menu_icon: "zmdi zmdi-account-add",
            path: "/app/student",
            child_routes: null,
        },
        {
            menu_title: "Delivery",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Delivered List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery/delivered",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Class",
            menu_icon: "zmdi zmdi-collection-text",
            path: "/app/class",
            child_routes: null,
        },
        
        {
            menu_title: "Request",
            menu_icon: "zmdi zmdi-time-restore-setting",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request",
                    child_routes: null,
                },
                {
                    menu_title: "Approved List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/approvedlist",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/otherlist",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Task Manager",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/inspection-listing",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/completed-listing",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Notification",
            menu_icon: "zmdi zmdi-notifications-active",
            path: "/app/notification",
            child_routes: null,
        },
        {
            menu_title: "Downloads",
            menu_icon: "zmdi zmdi-download",
            path: "",
            child_routes:[
                {
                    menu_title: "Enquiry",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-enquiry",
                    child_routes: null,
                },
                {
                    menu_title: "Student",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-student",
                    child_routes: null,
                },
                {
                    menu_title: "Delivery",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Exam",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-exam",
                    child_routes: null,
                },
                {
                    menu_title: "Attendance",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-attendance",
                    child_routes: null,
                },
            ]
        },
    ],
    //Marketing
    category3: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Country",
            menu_icon: "zmdi zmdi-flag",
            path: "/app/country",
            child_routes: null,
        },
        {
            menu_title: "Enquiry",
            menu_icon: "zmdi zmdi-accounts",
            path: "",
            child_routes:[
                {
                    menu_title: "Open List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry",
                    child_routes: null,
                },
                {
                    menu_title: "Overdue List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry/overdue",
                    child_routes: null,
                },
                {
                    menu_title: "Close List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry/close",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Student",
            menu_icon: "zmdi zmdi-account-add",
            path: "/app/student",
            child_routes: null,
        },
        {
            menu_title: "Delivery",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Delivered List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery/delivered",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Class",
            menu_icon: "zmdi zmdi-collection-text",
            path: "/app/class",
            child_routes: null,
        },
        
        {
            menu_title: "Request",
            menu_icon: "zmdi zmdi-time-restore-setting",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request",
                    child_routes: null,
                },
                {
                    menu_title: "Approved List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/approvedlist",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/otherlist",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Task Manager",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/inspection-listing",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/completed-listing",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Notification",
            menu_icon: "zmdi zmdi-notifications-active",
            path: "/app/notification",
            child_routes: null,
        },
        {
            menu_title: "Downloads",
            menu_icon: "zmdi zmdi-download",
            path: "",
            child_routes:[
                {
                    menu_title: "Enquiry",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-enquiry",
                    child_routes: null,
                },
                {
                    menu_title: "Student",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-student",
                    child_routes: null,
                },
                {
                    menu_title: "Delivery",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Exam",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-exam",
                    child_routes: null,
                },
                {
                    menu_title: "Attendance",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-attendance",
                    child_routes: null,
                },
            ]
        },
    ],
    //Admin
    category4: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Country",
            menu_icon: "zmdi zmdi-flag",
            path: "/app/country",
            child_routes: null,
        },
        {
            menu_title: "Enquiry",
            menu_icon: "zmdi zmdi-accounts",
            path: "",
            child_routes:[
                {
                    menu_title: "Open List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry",
                    child_routes: null,
                },
                {
                    menu_title: "Overdue List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry/overdue",
                    child_routes: null,
                },
                {
                    menu_title: "Close List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/enquiry/close",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Student",
            menu_icon: "zmdi zmdi-account-add",
            path: "/app/student",
            child_routes: null,
        },
        {
            menu_title: "Delivery",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Delivered List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery/delivered",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Class",
            menu_icon: "zmdi zmdi-collection-text",
            path: "/app/class",
            child_routes: null,
        },
        
        {
            menu_title: "Request",
            menu_icon: "zmdi zmdi-time-restore-setting",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request",
                    child_routes: null,
                },
                {
                    menu_title: "Approved List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/approvedlist",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/otherlist",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Task Manager",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/inspection-listing",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/completed-listing",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Notification",
            menu_icon: "zmdi zmdi-notifications-active",
            path: "/app/notification",
            child_routes: null,
        },
        {
            menu_title: "Downloads",
            menu_icon: "zmdi zmdi-download",
            path: "",
            child_routes:[
                {
                    menu_title: "Enquiry",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-enquiry",
                    child_routes: null,
                },
                {
                    menu_title: "Student",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-student",
                    child_routes: null,
                },
                {
                    menu_title: "Delivery",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Exam",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-exam",
                    child_routes: null,
                },
                {
                    menu_title: "Attendance",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-attendance",
                    child_routes: null,
                },
            ]
        },
    ],
    category8: [
        

    ],
    category7: [

    ],
    //Service or Support
    category5: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        
        {
            menu_title: "Student",
            menu_icon: "zmdi zmdi-account-add",
            path: "/app/student",
            child_routes: null,
        },
        {
            menu_title: "Delivery",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Delivered List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/delivery/delivered",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Class",
            menu_icon: "zmdi zmdi-collection-text",
            path: "/app/class",
            child_routes: null,
        },
        
        {
            menu_title: "Request",
            menu_icon: "zmdi zmdi-time-restore-setting",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request",
                    child_routes: null,
                },
                {
                    menu_title: "Approved List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/approvedlist",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/request/otherlist",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Task Manager",
            menu_icon: "zmdi zmdi-card-giftcard",
            path: "",
            child_routes:[
                {
                    menu_title: "Pending List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager",
                    child_routes: null,
                },
                {
                    menu_title: "Inspection List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/inspection-listing",
                    child_routes: null,
                },
                {
                    menu_title: "Completed List",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/taskmanager/completed-listing",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Notification",
            menu_icon: "zmdi zmdi-notifications-active",
            path: "/app/notification",
            child_routes: null,
        },
        {
            menu_title: "Downloads",
            menu_icon: "zmdi zmdi-download",
            path: "",
            child_routes:[
                {
                    menu_title: "Enquiry",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-enquiry",
                    child_routes: null,
                },
                {
                    menu_title: "Student",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-student",
                    child_routes: null,
                },
                {
                    menu_title: "Delivery",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-delivery",
                    child_routes: null,
                },
                {
                    menu_title: "Exam",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-exam",
                    child_routes: null,
                },
                {
                    menu_title: "Attendance",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/download-attendance",
                    child_routes: null,
                },
            ]
        },
    ],
    
    category6: [
        
    ],
};
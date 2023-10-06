import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface BreadcrumbProps { 
    pageName: string;
    path: string;
    action: string;
    // children : any;
}

export default function BreadCrumb(props :BreadcrumbProps){
    const { pageName, path, action } = props;
    if(action !== ''){
        return <Breadcrumb items={[
                { title: <Link to="/">Trang chủ</Link> },
                { title: <Link to={path}>{pageName}</Link> },
                { title: action},
            ]} />
    }
    return <Breadcrumb items={[
        { title: <Link to="/">Trang chủ</Link> },
        { title: pageName },
    ]} />
}
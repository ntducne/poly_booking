import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

interface PaginationsProps { 
    page: any,
    changePage: (page: number) => void
}

export default function Paginations(props :PaginationsProps){
    const [pageParam] = useSearchParams();
    const page = props.page;
    const [activePage, setActivePage] = useState(page);
    const onChange: PaginationProps['onChange'] = (page) => {
        setActivePage(page)
        props.changePage(page)
    };
    var pagination = null
    if(page != null){
        pagination = (
            <Pagination 
                
                className='flex items-center justify-end mr-5 mt-10' 
                current={1} 
                onChange={onChange} 
                total={page * 10} 
                itemRender={(page, type, originalElement) => {
                    if (type === 'page') {
                        const active = pageParam.get('page') === String(page);
                        return (<span id='paginatee' className={active ? 'font-bold' : ''} style={{color: active ? 'blue' : ''}}>{page}</span>);
                    }
                    return originalElement;
                }}
            />
        )
    }
    return pagination
}
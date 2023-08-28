import Page from '../../components/Page'
import HeroSlide from '../../components/HeroSlide'
import BookForm from '../../components/BookForm'
import Room from '../../components/Room'
import { Pagination } from 'antd'

type Props = {}

const rooms = [
    {
        id: 1,
        name: "Room 1",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 3,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Room 2",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 4,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Room 3",
        price: 20000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 12,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Room 4",
        price: 1000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 10,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
]
export default function Rooms({ }: Props) {

    return (
        <Page title='Phòng'>
            <HeroSlide />
            <BookForm />
            <div className='mt-[100px] px-4 mb-[100px]'>
                <div className='container mx-auto lg:px-0'>
                    <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
                        {rooms.map((room: any) => {
                            return <Room key={room.id} data={room} />
                        })}

                    </div>
                </div>
                <div className='flex justify-end'>
                    <Pagination  defaultCurrent={6} total={500} />
                </div>
            </div>
        </Page>
    )
}
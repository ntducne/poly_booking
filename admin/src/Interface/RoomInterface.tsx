export interface RoomInterface {
    id?: string,
    name?: string,
    slug?: string,
    area?: number,
    adult?: number,
    child?: number,
    pay_upon_check_in?: number,
    description?: string,
    discount?: number,
    status?: number,
    policies_and_information?: {
        check_in_time?: string,
        check_out_time?: string,
    },
    num_of_bed?: number,
    bed_size?: number,
    branch?: {
        id?: string,
        name?: string,
        address?: string,
        phone?: string,
    },
    images?: Array<{
        id?: string,
        image?: string,
    }>,
    rate?: Array<{}>,
    type?: {
        id?: string,
        room_type_name?: string,
        description?: string,
        price_per_night?: number,
        status?: number,
    }
}
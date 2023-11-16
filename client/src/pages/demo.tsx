import { Card } from "antd";

export default function Demo() {
    return (
        <div className="flex container mx-auto">
            <Card title="Card title" className="w-full max-w-xl">
                Card content
            </Card>
            <Card title="Card title" className="w-full">
                Card content
            </Card>
        </div>
    )
}

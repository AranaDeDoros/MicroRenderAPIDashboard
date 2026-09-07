
interface ServiceProps {
    serviceId: string
}
import { Requester } from "../infra/Requester"

export const ServicesClient = () => {

    const requester = new Requester()

    const list = async (): Promise<any[]> => {
        const req = await requester.request("GET", "/services");
        return req;
    }

    const resume = async ({serviceId}: ServiceProps): Promise<any[]> => {
        const req = await requester.request("POST", `/services/${serviceId}/resume`);
        return req;
    }
    const suspend = async ({serviceId}: ServiceProps): Promise<any[]> => {
        const req = await requester.request("POST", `/services/${serviceId}/suspend`);
        return req;
    }

    const restart = async ({serviceId}: ServiceProps): Promise<any[]> => {
        const req = await requester.request("POST", `/services/${serviceId}/restart`);
        return req;
    }

    const postgresList = async (): Promise<any[]> => {
        const req = await requester.request("GET", "/list_postgres");
        return req;
    }

    return {
        list,
        postgresList,
        restart,
        resume,
        suspend,
    }

}

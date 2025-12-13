import { API_ROUTES } from "@/constants/ApiRoute";


export const getRequestUsers = async () => {
    try {
        const response = await fetch(API_ROUTES.REQUESTUSER.GET_ALL,{credentials: "include"});
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data)
        return data;
        
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}

export const getIncomeMarketingById = async (id: string) => {
    try {
        const response = await fetch(API_ROUTES.FINANCIAL.INCOMEMARKETING.GET_BY_ID(id),{credentials: "include"});
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("SERVER ERROR: ", error)
        return null;
    }
}


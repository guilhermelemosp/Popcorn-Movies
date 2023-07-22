import axios from "axios";
import { useContext } from "react";

export const userDataLoginAge = async () => {
    const { age } = useContext(Contextpage)

    const response = await axios.get("http://localhost:8080/login",
    {
        params: {
          age: age,
        },
      });
    const userReturn = response.data;
    return userReturn;
}
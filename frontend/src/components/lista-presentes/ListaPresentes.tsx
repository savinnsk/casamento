import { useEffect, useState } from "react"
import { getGiftsAvailable , sendGifts } from "../../service/gifts-service"
import "./index.css"
import { useStore } from "../../hooks/store";
import ColorPalette from "../color-pallet/color-pallet";

interface Gift {
    id: string; 
    name: string;
}
export function GiftList(){

    const [gifts, setGifts] = useState<Gift[]>([]);
    const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);;
    const {user,setUser} = useStore();

    useEffect(() => {
        const loadGifts = async () => {
            try {
                const result = await getGiftsAvailable();
             
                setGifts(result);
            } catch (error) {
                console.error("Error loading gifts:", error);
            }
        };

        loadGifts();
    }, []);

    const handleCheckboxChange = (event : any, item : any) => {
        if (event.target.checked) {
            setSelectedGifts((prev) => [...prev, item]);
        } else {
            setSelectedGifts((prev) => prev.filter(gift => gift.id !== item.id));
        }
    };

    const handleSubmit = async () => {
        try {
            const result = await sendGifts({user, gifts : selectedGifts})
            
            setGifts(result.gifts)
            setUser(result.user)

        } catch (error) {
            console.error("Error sending selected gifts:", error);
        }
    }

    return (
        <div className="container-gifts">
             <ColorPalette/>
             <p>selecione o presente que deseja levar</p>
             <button onClick={handleSubmit}>Enviar</button>
            {gifts.map((item : any) => (
                <div key={item.id} className="gift-items">
                    <label>
                        <span> <input
                            className="checkbox-gift"
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(e, item)}
                        /></span>
                        <span>{item.name}</span>
                    </label>
                </div>
            ))}
           
        </div>
    );


}
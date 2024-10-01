import { useEffect, useState } from "react"
import { getUserGiftsAvailable ,cancelGifts } from "../../service/gifts-service"
import "./index.css"
import { useStore } from "../../hooks/store";

interface Gift {
    id: string; 
    name: string;
}
export function UserGift(){

    const [gifts, setGifts] = useState<Gift[]>([]);
    const [selectedGifts, setSelectedGifts] = useState<Gift[]>([]);;
    const {user,setUser} = useStore();

    useEffect(() => {
        const loadGifts = async () => {
            try {
                const result = await getUserGiftsAvailable(user);
                setGifts(result.userGifts);
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
            const result = await cancelGifts({user, gifts : selectedGifts})
            const gifts = await getUserGiftsAvailable(user);
            setGifts(gifts)
            setUser(result.user)

        } catch (error) {
            console.error("Error sending selected gifts:", error);
        }
    }

    return (
        <div className="container-gifts">
       
             <p>selecione o presente que deseja levar</p>
           {selectedGifts.length > 0 && (<button  onClick={handleSubmit}>Cancelar</button>)  } 
           {selectedGifts.length == 0 && (<button  style={{    pointerEvents: "none", 
             opacity: 0.5 /* Diminui a opacidade para parecer desativado */}}>Sem items</button>)  } 
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

import './index.css'; // Certifique-se de criar este arquivo CSS

const ColorPalette = () => {
    const colors = ['#ffffff', '#000000', '#f1c07e',];

    return (
        <div className='pallet-container'> <p>Paleta de Cores Da Casa</p>
                <div className="color-palette">


{colors.map((color, index) => (
    <div
        key={index}
        className="color-circle"
        style={{ backgroundColor: color }}
    />
))}


</div>
        </div>

    );
};

export default ColorPalette;
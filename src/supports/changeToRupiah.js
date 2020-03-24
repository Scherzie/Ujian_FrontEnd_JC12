import Numeral from 'numeral';

export const changeToRupiah = (a) =>{
    return (
        `IDR `+Numeral(a).format(0.0)
    )
}
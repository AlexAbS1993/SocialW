export const howToRemains = () => {
        let currentHour = new Date().getHours()
        if(currentHour >= 5 && currentHour <= 12){
            return (12) - (currentHour)
        }
        if (currentHour > 12 && currentHour <= 17){
            return (17) - (currentHour)
        }
        if (currentHour > 17 && currentHour <=23){
            return (23) - (currentHour)
        }
        else {
            return (4) - (currentHour)
        }
}
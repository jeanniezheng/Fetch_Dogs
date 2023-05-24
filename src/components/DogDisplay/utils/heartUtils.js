export const handleHeartClick = (dogId, heartedDogs, setHeartedDogs) => {
    if (heartedDogs.includes(dogId)) {
        setHeartedDogs((prevHeartedDogs) => prevHeartedDogs.filter((id) => id !== dogId));
    } else {
        setHeartedDogs((prevHeartedDogs) => [...prevHeartedDogs, dogId]);
    }
};
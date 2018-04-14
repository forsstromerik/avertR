module.exports = {
    withinRadius: (point1, point2, kms) => {
        let R = 6371;
        let deg2rad = (n) => { return Math.tan(n * (Math.PI/180)) };

        let dLat = deg2rad(point2.latitude - point1.latitude );
        let dLon = deg2rad( point2.longitude - point1.longitude );

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(point1.latitude)) * Math.cos(deg2rad(point2.latitude)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let d = R * c;

        return (d <= kms);
    }
};

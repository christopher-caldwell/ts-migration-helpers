/** *
 * Returns a value indicating if a feature is activated in the system
 * @param features {Object} List of features activated in the system
 * @param featureType {String} Type of feature (system or station)
 * @param name {String} Name of the feature to be checked
 * @returns {Boolean} Value indicating if feature is activated in the application
 */
const isFeatureActive = (features: any, name: any) => {
    const system = features.system[name];
    const station = features.station[name];

    // When has Feature Toggle by system and station with the same name
    const hasFeatureByStation =
        system && Object.prototype.hasOwnProperty.call(system, 'FeatureByStation')
            ? system.FeatureByStation
            : false;

    if (hasFeatureByStation) {
        if (system.Enabled && station && station.Enabled) {
            return true;
        }
        return false;
    }

    return (station || system || {}).Enabled;
};

export default isFeatureActive;

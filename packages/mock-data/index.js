const incidents = require('./incidents.json');

/**
 * Returns all simulated incidents.
 * @returns {Array} List of incident objects.
 */
function getAllIncidents() {
  return incidents;
}

/**
 * Returns an incident by ID.
 * @param {string} id
 * @returns {Object|null}
 */
function getIncidentById(id) {
  return incidents.find(item => item.id === id) || null;
}

/**
 * Returns verified incidents.
 * @returns {Array}
 */
function getVerifiedIncidents() {
  return incidents.filter(item => item.verified);
}

module.exports = {
  incidents,
  getAllIncidents,
  getIncidentById,
  getVerifiedIncidents
};

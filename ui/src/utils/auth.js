const userHasRoles = (userRoles, requiredRoles) => {
    /* check user roles */
    const rolesFound = userRoles.some(r => requiredRoles.includes(r.roleName));
    return rolesFound;
};

export default userHasRoles;

const userHasRoles = (userRoles: any, requiredRoles: any) => {
    /* check user roles */
    const rolesFound = userRoles.some((r: any) => requiredRoles.includes(r.roleName));
    return rolesFound;
};

export default userHasRoles;

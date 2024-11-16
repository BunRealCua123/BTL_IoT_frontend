import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const HideRoute = ({ children, isAuthenticated }) => {

  if (!isAuthenticated)return children;
};

export default HideRoute;

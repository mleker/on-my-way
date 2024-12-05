import { ILocation } from '../@types/location';
import { IRequest } from '../@types/request';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// --------------------------------------------------------
// User related API methods
// --------------------------------------------------------

export interface IRegisterRequestProps {
  email: string;
  password: string;
  confirm: string;
  name: string;
  phone: string;
  vehicleType?: string;
  licenseNum?: string;
}

export interface ILoginRequestProps {
  email: string;
  password: string;
}

export const registerUser = async (props: IRegisterRequestProps): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    });
    return await response.json();
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
};

export const loginUser = async (props: ILoginRequestProps): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    });
    return await response.json();
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

export const logoutUser = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error logging out:", err);
    throw err;
  }
};

export const fetchProfile = async (token: string, userId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching profile:", err);
    throw err;
  }
};

export const fetchUser = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
}

// --------------------------------------------------------
// Request related API methods
// --------------------------------------------------------

export const fetchRequests = async (): Promise<[IRequest]> => {
  try {
    const response = await fetch(`${BASE_URL}/requests`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching requests:", err);
    throw err;
  }
};

export interface IRequestProps {
  riderId: string;
  from: string;
  to: string;
}

export const createRequest = async (props: IRequestProps): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/requests`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });
    return await response.json();
  } catch (err) {
    console.error("Error creating request:", err);
    throw err;
  }
};

export const acceptRequest = async (requestId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/requests/${requestId}/accept`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error accepting request:", err);
    throw err;
  }
};

export const completeRequest = async (requestId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/requests/${requestId}/complete`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error completing request:", err);
    throw err;
  }
};

export const cancelRequest = async (requestId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/requests/${requestId}/cancel`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error cancelling request:", err);
    throw err;
  }
};

// --------------------------------------------------------
// Ride related API methods
// --------------------------------------------------------

export const fetchRides = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/rides`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching rides:", err);
    throw err;
  }
};

export interface IRideProps {
  driverId: string;
  riderId?: string;
  from: ILocation;
  to: ILocation;
}

export const createRide = async (props: IRideProps): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/rides`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });
    return await response.json();
  } catch (err) {
    console.error("Error creating ride:", err);
    throw err;
  }
};

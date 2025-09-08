import { use, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

const GuestOnly = ({ children }) => {
  const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
       if (authChecked && user !== null) {
           router.replace("/(dashboard)/profile");
       }
    }, [authChecked, user]);

    if (!authChecked || user) {
        return ( <ThemedLoader /> ); // or a loading spinner, etc.
    }
  return children;
};

export default GuestOnly;
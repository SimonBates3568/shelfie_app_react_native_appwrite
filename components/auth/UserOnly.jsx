import { use, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
       if (authChecked && user === null) {
           router.replace("/(auth)/login");
       }
    }, [authChecked, user]);

    if (!authChecked || !user) {
        return ( <ThemedLoader /> ); // or a loading spinner, etc.
    }
  return children;
};

export default UserOnly;
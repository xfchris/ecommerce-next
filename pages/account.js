import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Auth/Account/ChangeNameForm";
import Seo from "../components/Seo";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";

export default function account() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const { auth, logout, setReloadUser } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await getMeApi(logout);
      setUser(res || null);
    })();
  }, [auth]);

  const reloadUser = () => {
    setReloadUser(true);
  };

  if (!auth && !user && user !== undefined) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Seo title="Mi cuenta" />
      {user !== undefined && (
        <Configuracion user={user} logout={logout} reloadUser={reloadUser} />
      )}
    </BasicLayout>
  );
}

function Configuracion({ user, logout, reloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm user={user} logout={logout} reloadUser={reloadUser} />
      </div>
    </div>
  );
}

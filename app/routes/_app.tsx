import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import {
  Icons,
  LayoutApp,
  Logo,
  NavbarApp,
  SidebarMenu,
  cn,
} from "@vert-capital/design-system-ui";
import { useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import routes from "~/common/routes";
import { userPrefs } from "~/cookies.server";
import authenticated from "~/policies/authenticated";

export const meta: MetaFunction<typeof loader> = () => [
  {
    title: `SKYSWITCH`,
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await authenticated(request);

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  // // Check is mobile
  const userAgent = request.headers.get("User-Agent");
  const { isMobile } = getSelectorsByUserAgent(userAgent || "");

  return json({ user, collapseMenu: cookie.collapseMenu, isMobile });
}

export default function Index() {
  const { user, collapseMenu, isMobile } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [isCollapsed, setIsCollapsed] = useState(collapseMenu || isMobile);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const setCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    const formData = new FormData();
    formData.append("collapseMenu", String(!isCollapsed));
    formData.append("_action", "saveMenuState");
    fetcher.submit(formData, {
      method: "POST",
      action: "/resources/prefs-user",
    });
  };
  return (
    <LayoutApp
      pathname={pathname}
      isCollapsed={isCollapsed}
      preventingScrollRoutes={[routes.app]}
      sibebar={
        <>
          <div className="w-full h-14 flex items-center justify-start">
            <Link
              to={routes.app}
              tabIndex={-1}
              className="flex-none flex justify-center items-center w-full space-x-2"
            >
              <Logo
                src={
                  isCollapsed
                    ? "/resources/images/logo.svg"
                    : "/resources/images/logo-full.svg"
                }
                className={cn(isCollapsed ? "w-8 pl-2" : "w-24 pl-2")}
              />
            </Link>
          </div>
          <SidebarMenu
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Home",
                icon: Icons.HomeIcon,
                variant: "default",
                active: pathname === routes.app,
                onClick: () => navigate(routes.app),
              },
              ...(user?.is_admin
                ? [
                    {
                      title: "Cloud Accounts",
                      variant: "default" as const,
                      icon: Icons.CloudLightningIcon,
                      active: pathname === routes.cloud_accounts,
                      onClick: () => navigate(routes.cloud_accounts),
                    },
                    {
                      title: "Calendars",
                      variant: "default" as const,
                      icon: Icons.CalendarDaysIcon,
                      active: pathname === routes.calendar,
                      onClick: () => navigate(routes.calendar),
                    },
                    {
                      title: "Instances",
                      variant: "default" as const,
                      icon: Icons.ComputerIcon,
                      active: pathname === routes.instances,
                      onClick: () => navigate(routes.instances),
                    },
                    {
                      title: "DB Instances",
                      variant: "default" as const,
                      icon: Icons.DatabaseIcon,
                      active: pathname === routes.dbinstances,
                      onClick: () => navigate(routes.dbinstances),
                    },
                    {
                      title: "AutoScalling Groups",
                      variant: "default" as const,
                      icon: Icons.SquareStackIcon,
                      active: pathname === routes.autoscalling_groups,
                      onClick: () => navigate(routes.autoscalling_groups),
                    },
                    {
                      title: "Jobs",
                      variant: "default" as const,
                      icon: Icons.WorkflowIcon,
                      active: pathname === routes.jobs,
                      onClick: () => navigate(routes.jobs),
                    },
                    {
                      title: "Logs",
                      variant: "default" as const,
                      icon: Icons.TextSelectIcon,
                      active: pathname === routes.log,
                      onClick: () => navigate(routes.log),
                    },
                    {
                      title: "Users",
                      variant: "default" as const,
                      icon: Icons.Users2Icon,
                      active: pathname === routes.users,
                      onClick: () => navigate(routes.users),
                    },
                  ]
                : []),
            ]}
          />
        </>
      }
      navbar={
        <NavbarApp
          isMobile={isMobile}
          setCollapsed={setCollapsed}
          hideApps={true}
          hideNotifications={true}
          hideUser={true}
          logout={() => {
            fetcher.submit("", {
              method: "POST",
              action: "/auth/logout",
            });
          }}
        />
      }
      content={<Outlet />}
    />
  );
}

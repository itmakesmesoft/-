import "./App.css";
import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import Auth from "./context/Auth";
import NavBar from "./components/NavBar/index.jsx";
import BlockChain from "./context/BlockChain";
import Footer from "./components/Footer/Index";
import MainPage from "./pages/MainPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DonationPage = lazy(() => import("./pages/DonationPage"));
const DonationDetailPage = lazy(() => import("./pages/DonationDetailPage"));
const GatchaPage = lazy(() => import("./pages/GatchaPage"));
const PointPage = lazy(() => import("./pages/PointPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const ReviewDetailPage = lazy(() => import("./pages/ReviewDetailPage"));
const NoticeDetailPage = lazy(() => import("./pages/NoticeDetailPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PayResult = lazy(() => import("./pages/PointPage/components/PayResult"));
const PasswordPage = lazy(() => import("./pages/PasswordPage"));
const ProjectCreatePage = lazy(() => import("./pages/Admin/ProjectCreatePage"));
const NoticeUpdatePage = lazy(() => import("./pages/Admin/NoticeUpdatePage"));
const NoticeCreatePage = lazy(() => import("./pages/Admin/NoticeCreatePage"));
const ReviewUpdatePage = lazy(() => import("./pages/ReviewUpdatePage"));
const AuthCordPage = lazy(() => import("./pages/Admin/AuthCodePage"));
const AdminPage = lazy(() => import("./pages/Admin"));
const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const PrivateRoute = lazy(() => import("./routes/PrivateRoute"));
const HjooPage = lazy(() => import("./pages/ethers/HjooPage"));
const ReviewCreatePage = lazy(() => import("./pages/ReviewCreatePage"));
const VolunteerCodePage = lazy(() => import("./pages/Admin/VolunteerCodePage"));
const NftPage = lazy(() => import("./pages/NftPage/nftPage"));
const NftTestPage = lazy(() => import("./pages/NftPage/NftTestPage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));
const MetamaskCheck = lazy(() => import("./components/MetamaskCheck"));
const AnimationPage = lazy(() => import("./pages/AnimationPage"));

export default function App() {
  // useBeforeunload((event) => event.preventDefault()); // 새로고침 막기 보류

  return (
    <Auth>
      <BlockChain>
        <div className="App">
          <NavBar />
          <Body>
            <Suspense fallback={<div>loading</div>}>
              <Routes>
                <Route element={<PublicRoute />}>
                  <Route path={"/login"} element={<LoginPage />} />
                  <Route path={"/signup"} element={<SignupPage />} />
                  <Route path={"/password"} element={<PasswordPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route
                    path={"/admin/project/create"}
                    element={<ProjectCreatePage />}
                  />
                  <Route
                    path={"/admin/notice/:projectid"}
                    element={<NoticeCreatePage />}
                  />
                  <Route
                    path={"/admin/notice/update/:boardid"}
                    element={<NoticeUpdatePage />}
                  />
                  <Route
                    path={"/review/update/:reviewid"}
                    element={<ReviewUpdatePage />}
                  />
                  <Route path={"/admin/authcord"} element={<AuthCordPage />} />
                  <Route
                    path={"/admin/volunteer"}
                    element={<VolunteerCodePage />}
                  />
                  <Route path={"/admin"} element={<AdminPage />} />
                  <Route path={"/payresult"} element={<PayResult />} />
                  <Route
                    path={"/review/create"}
                    element={<ReviewCreatePage />}
                  />
                  <Route path={"/profile"} element={<ProfilePage />} />
                </Route>
                <Route path={"/"} element={<MainPage />} />
                <Route path={"/donation"} element={<DonationPage />} />
                <Route
                  path={"/donation/:projectId"}
                  element={<DonationDetailPage />}
                />
                <Route path={"/gatcha"} element={<GatchaPage />} />
                <Route path={"/point"} element={<PointPage />} />

                <Route path={"/review"} element={<ReviewPage />} />
                <Route
                  path={"/review/:reviewid"}
                  element={<ReviewDetailPage />}
                />
                <Route
                  path={"/notice/:category"}
                  element={<NoticeDetailPage />}
                />
                <Route path={"/hjooo"} element={<HjooPage />} />
                <Route path={"/sun"} element={<NftPage />} />
                <Route path={"/sunny"} element={<NftTestPage />} />
                <Route path={"/check"} element={<MetamaskCheck />} />
                <Route path={"/event"} element={<AnimationPage />} />
                <Route path={"/*"} element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Body>
          <Footer />
        </div>
      </BlockChain>
    </Auth>
  );
}
// nav와 content 분리용 - 이은혁
const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  position: relative;
`;

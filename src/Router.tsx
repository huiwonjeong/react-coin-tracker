import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {}

function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/react-coin-tracker">
          <Coins />
        </Route>
        <Route path="/react-coin-tracker/:coinId">
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;

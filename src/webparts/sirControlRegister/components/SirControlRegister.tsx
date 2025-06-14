import * as React from 'react';
import styles from './SirControlRegister.module.scss';
// import styles
import type { ISirControlRegisterProps } from './ISirControlRegisterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { InitiatorLanding } from "./Pages/InitiatorLandingPage";
import { NewRequest } from './Pages/NewRequest';
import { EditRequest } from './Pages/EditRequest';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, match, useParams, Redirect } from 'react-router-dom';


export default class PatelEng extends React.Component<ISirControlRegisterProps, {}> {
  public render(): React.ReactElement<ISirControlRegisterProps> {
    const {
      hasTeamsContext,
      
    } = this.props;

    return (
      <section>
        <div id='divBlockRequestsLoader' className={'blockRequestLoader'}></div>

        <div>
        <HashRouter>
                <Switch>                 
                <Route path='/' exact={true}  render={() => <NewRequest  {...this.props} />} />
                   <Route path='/InitiatorLanding'  render={() => <InitiatorLanding  {...this.props} />} />
                   <Route path='/EditRequest/:ArtIntId'  render={() => <EditRequest  {...this.props} />} />

                   
                   {/* <Route path='/ViewPendingApprovalSCView'  render={() => <ViewPendingApprovalSCView  {...this.props} />} /> */}

                   
                    </Switch>
              </HashRouter>
        </div>
      </section>
    );
  }
}

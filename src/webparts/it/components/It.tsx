import * as React from 'react';
import styles from './It.module.scss';
// import styles
import type { IItProps } from './IItProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { InitiatorLanding } from "./Pages/InitiatorLandingPage";
import { NewRequest } from './Pages/NewRequest';
import { EditRequest } from './Pages/EditRequest';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, match, useParams, Redirect } from 'react-router-dom';


export default class PatelEng extends React.Component<IItProps, {}> {
  public render(): React.ReactElement<IItProps> {
    const {
      hasTeamsContext,
      
    } = this.props;

    return (
      <section>
        <div id='divBlockRequestsLoader' className={'blockRequestLoader'}></div>

        <div>
        <HashRouter>
                <Switch>                 
                   <Route path='/' exact={true}  render={() => <NewRequest  {...this.props} requestType="new" />} />
                   <Route path='/budgeted' render={() => <NewRequest  {...this.props} requestType="budgeted" />} />
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

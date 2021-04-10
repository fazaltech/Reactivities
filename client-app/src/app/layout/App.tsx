import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';

import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';





const App = () => {
  const [activities, setActivites] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setloading]=useState(true);
  const [submitting, setSubmitting]=useState(false);
  const [target, setTarget]=useState('');

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then (()=>{
      setActivites([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false))
    
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then (()=>{  
      setActivites([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);}).then(()=>setSubmitting(false));
  
  }

  const handleDeleteActivity=(event: SyntheticEvent<HTMLButtonElement>,id:string)=>{
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then (()=>{  
    setActivites([...activities.filter(a=>a.id !== id)])}).then(()=>setSubmitting(false));

  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false)
  }
  useEffect(() => {
    agent.Activities.list()
    .then((response) => {
      let activities: IActivity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivites(activities);
    }).then(()=>setloading(false));
  }, []);

  if(loading) return <LoadingComponent content='Loading activities...'/>


  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );

}

export default App;

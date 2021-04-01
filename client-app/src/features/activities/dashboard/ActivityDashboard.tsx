import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity} />

            </Grid.Column>
            <Grid.Column width={6}>

                {selectedActivity && !editMode && (
                    <ActivityDetails
                        activity={selectedActivity}
                        setEditMode={setEditMode}
                        setSelectedActivity={setSelectedActivity}

                    />
                )}
                {editMode && <ActivityForm setEditMode={setEditMode} />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
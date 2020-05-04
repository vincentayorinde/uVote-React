// Pages
import {
    Calendar,
    Home,
    Media,
    Widgets,
    AddCandidate,
    AddParty,
    ListParties,
    ListCandidates,
    AddVoter,
    ListVoters,
    Results
} from './pages';

import AppsIcon from '@material-ui/icons/Apps';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// Icons
import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

export default {
    items: [
        {
            path: '/',
            name: 'Dashboard',
            type: 'link',
            icon: ViewColumnIcon,
            component: Home,
        },
        {
            path: '/parties',
            name: 'Political Parties',
            type: 'submenu',
            icon: AppsIcon,
            children: [
                {
                    path: '/add-party',
                    name: 'Add Party',
                    component: AddParty,
                },
                {
                    path: '/list-party',
                    name: 'List Parties',
                    component: ListParties,
                },
            ],
        },
        {
            path: '/canditates',
            name: 'Candidates',
            type: 'submenu',
            icon: PersonIcon,
            children: [
                {
                    path: '/add-candidate',
                    name: 'Add Candidate',
                    component: AddCandidate,
                },
                {
                    path: '/list-candidates',
                    name: 'List Candidates',
                    component: ListCandidates,
                },
            ],
        },
        {
            path: '/voters',
            name: 'Voters',
            type: 'submenu',
            icon: FaceIcon,
            children: [
                {
                    path: '/add-voter/',
                    name: 'Add Voter',
                    component: AddVoter,
                },
                {
                    path: '/list-voters',
                    name: 'List Voters',
                    component: ListVoters,
                },
            ],
        },
        {
            path: '/results',
            name: 'Results',
            type: 'link',
            icon: EqualizerIcon,
            component: Results,
        },
        {
            path: 'https://encrisoft.com',
            name: 'Powered by Encrisoft',
            type: 'external',
            icon: BookmarkIcon,
        },
    ],
};

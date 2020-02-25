import {connect} from 'react-redux'
import HomeView from '../components/HomeView';
//loading: state.loading,
const mapStateToProps = state => {
    const {UI} = state.gs;
    return {

    }
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeView)

import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { ChartTypes } from '../utils/Charts';

const NewChartDrawer = React.createClass({
  propTypes: {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    availableDataSources: PropTypes.array.isRequired,
    handleCreateChart: PropTypes.func.isRequired,
    onRemoveChart: PropTypes.func.isRequired,
    charts: PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      chartType: null,
      dataSource: null,
      chartName: null,
      chartValid: false,
    };
  },

  validateChart() {
    const { chartType, dataSource } = this.state;
    if (chartType !== null && dataSource !== null) {
      this.setState({
        chartValid: true,
      });
    } else {
      this.setState({
        chartValid: false,
      });
    }
  },

  handleCreateChart() {
    const { handleCreateChart, availableDataSources } = this.props;
    const { chartType, dataSource, chartName, chartValid } = this.state;
    this.validateChart();
    if (chartValid) {
      const namedChartType = ChartTypes[chartType];
      const namedDataSource = availableDataSources[dataSource];
      handleCreateChart(namedChartType, namedDataSource, chartName);
    }
  },

  handleSelectChartType(event, index, value) {
    this.setState({
      chartType: value,
    }, this.validateChart);
  },

  handleSelectDataSource(event, index, value) {
    this.setState({
      dataSource: value,
    }, this.validateChart);
  },

  handleChartTitle(event) {
    this.setState({
      chartName: event.target.value,
    }, this.validateChart);
  },

  render() {
    const { open, handleOpen, availableDataSources, charts, onRemoveChart } = this.props;
    const { chartValid } = this.state;
    return (
      <Drawer
          openSecondary={true}
          docked={false}
          open={open}
          onRequestChange={handleOpen}
        >
          <List className="chart-drawer">
            <TextField
              hintText="Chart Title"
              onChange={this.handleChartTitle}
            /><br />
            <SelectField
              floatingLabelText="Chart Type"
              value={this.state.chartType}
              onChange={this.handleSelectChartType}
              autoWidth={true}
            >
            {ChartTypes.map((value, index) => {
              return (
                <MenuItem key={index} value={index} primaryText={value} />
              );
            })}
            </SelectField>
            <br />
            <SelectField
              floatingLabelText="Data Source"
              value={this.state.dataSource}
              onChange={this.handleSelectDataSource}
              autoWidth={true}
            >
            {availableDataSources.map((source, index) => {
              return (
                <MenuItem key={index} value={index} primaryText={source} />
              );
            })}
            </SelectField>
            <br />
            <RaisedButton
              label="Add a new chart"
              fullWidth={true}
              primary={true}
              disabled={!chartValid}
              onTouchTap={this.handleCreateChart}
              />
          </List>
          <Divider />
            <h2>Click to remove</h2>
             {charts.map((chart, index) => {
                return (
                  <Chip
                    key={index}
                    onRequestDelete={() => onRemoveChart(index)}
                    className="chart-chip"
                    style={{ margin: '5px' }}
                  >
                  {chart.container}
                  </Chip>
                );
              })}
        </Drawer>
    );
  },
});

export default NewChartDrawer;

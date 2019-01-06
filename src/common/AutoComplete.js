import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";

function renderInputComponent(inputProps) {
    const {
        classes, inputRef = () => {
        }, ref, ...other
    } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{fontWeight: 500}}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{fontWeight: 300}}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

const styles = theme => ({
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class AutoComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value ? this.props.value : '',
            suggestions: this.props.suggestions ? this.props.suggestions : [],
            originalSuggestions: this.props.suggestions ? this.props.suggestions : []
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.suggestions
            && nextProps.suggestions.length > 0
            && (!this.props.suggestions || this.props.suggestions.length === 0)) {

            console.log('NEW PROPS');
            console.log(nextProps);

            this.setState({
                suggestions: this.props.suggestions,
                originalSuggestions: this.props.suggestions,
            });
        }
    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        if(!this.state.originalSuggestions || this.state.originalSuggestions.length === 0){
            return [];
        }
        if(inputLength === 0){
            return this.state.originalSuggestions;
        }

        return this.state.originalSuggestions.filter(suggestion => {
                const keep = count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    };

    getSuggestionValue = (suggestion) => {
        return suggestion;
    };

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    shouldRenderSuggestions = () => {
        return true;
    };

    handleChange = () => (event, {newValue}) => {
        this.setState({
            value: newValue,
        });
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    };

    render() {
        const {classes} = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            shouldRenderSuggestions: this.shouldRenderSuggestions,
            renderSuggestion,

        };

        return (
            <div>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        placeholder: this.props.placeholder ? this.props.placeholder : 'Podaj wartość',
                        value: this.props.value,
                        onChange: this.handleChange(),
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                        <Paper {...options.containerProps} square>
                            {options.children}
                        </Paper>
                    )}
                />
            </div>
        );
    }
}

AutoComplete.propTypes = {
    value: PropTypes.string,
    suggestions: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default withStyles(styles)(AutoComplete);

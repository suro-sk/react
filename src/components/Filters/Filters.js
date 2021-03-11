import React, {useState} from "react";
import {FormControl, Button, DropdownButton, Dropdown, Form, Row, Col, InputGroup} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import {formatDate} from "../../helpers/functions";
import {getTasks} from "../store/actions";

function Filters(props) {

    const statusOptions = [
        {
            label: 'All',
            value: ''
        },
        {
            label: 'Active',
            value: 'active'
        },
        {
            label: 'Done',
            value: 'done'
        }
    ];

    const orderOptions = [
        {
            label: 'Default',
            isHeader: false,
            value: ''
        },
        {
            label: 'Name',
            isHeader: true,
        },
        {
            label: 'A-Z',
            value: 'a-z'
        },
        {
            label: 'Z-A',
            value: 'z-a'
        },
        {
            label: 'Creation date',
            isHeader: true,
        },
        {
            label: 'Newest first',
            value: 'creation_date_newest'
        },
        {
            label: 'Oldest first',
            value: 'creation_date_oldest'
        },
        {
            label: 'Completion date',
            isHeader: true,
        },
        {
            label: 'Newest First',
            value: 'completion_date_newest'
        },
        {
            label: 'Oldest First',
            value: 'completion_date_oldest'
        }
    ];

    const dateOptions = [
        {
            label: 'Created before',
            value: 'create_lte'
        },
        {
            label: 'Created after',
            value: 'create_gte'
        },
        {
            label: 'Deadline before',
            value: 'complete_lte'
        },
        {
            label: 'Deadline after',
            value: 'complete_gte'
        }
    ];

    const [search, setSearch] = useState('');

    const [status, setStatus] = useState({
        value: ''
    });

    const [sorting, setSorting] = useState({
        value: ''
    });

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });

    const handleChangeDate = (value, name) => {
        setDates({
            ...dates,
            [name]: value
        });
    };

    function filtersSubmitHandler(e) {
        e.preventDefault();

        const params = {};

        search && (params.search = search);
        sorting.value && (params.sort = sorting.value);
        status.value && (params.status = status.value);

        for (let key in dates) {
            if (dates[key]) {
                params[key] = formatDate(dates[key].toISOString());
            }
        }

        props.getTasks(params);
    }

    return (
        <Form className="filters" onSubmit={filtersSubmitHandler}>
            <InputGroup>
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    variant="outline-primary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title={status.value ? status.label : 'Filter by status'}
                    id="statuses"
                >
                    {
                        statusOptions.map((option, idx) => {
                            return <Dropdown.Item
                                key={idx}
                                onClick={() => setStatus(option)}
                                value={option.value}
                                active={status.value === option.value}
                            >
                                {option.label}
                            </Dropdown.Item>
                        })
                    }

                </DropdownButton>
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title={sorting.value ? sorting.label : 'Order by:'}
                    id="order"
                >
                    {
                        orderOptions.map((option, idx) => {
                            if (option.isHeader) {
                                return <Dropdown.Header key={idx}>{option.label}</Dropdown.Header>
                            } else {
                                return <Dropdown.Item
                                    key={idx}
                                    onClick={() => setSorting(option)}
                                    value={option.value}
                                    active={sorting.value === option.value}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            }
                        })
                    }
                </DropdownButton>
                <InputGroup.Append>
                    <Button variant="primary" type="submit">Apply</Button>
                </InputGroup.Append>
            </InputGroup>
            <Row className="justify-content-center mt-4">

                {
                    dateOptions.map((option, idx) => (
                        <Col key={idx}>
                            <Form.Group controlId={option.value} className="d-flex flex-column align-items-center">
                                <Form.Label>{option.label}</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    id={option.value}
                                    selected={dates[option.value]}
                                    onChange={(value) => handleChangeDate(value, option.value)}
                                    isClearable
                                />

                            </Form.Group>
                        </Col>
                    ))
                }

            </Row>
        </Form>
    )
}

const mapDispatchToProps = {
    getTasks,
};

export default connect(null, mapDispatchToProps)(Filters);
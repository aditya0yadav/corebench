import React from 'react';

const SchemaMarkup = ({ data }) => {
    return (
        <script type="application/ld+json">
            {JSON.stringify(data)}
        </script>
    );
};

export default SchemaMarkup;

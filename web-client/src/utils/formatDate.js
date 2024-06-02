const formatDate = (dateString: string) => {
    if (!dateString)
        return []
    const inputDate = new Date(dateString);

    const optionsDate = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZoneName: 'short',
    };

    const formattedDate = new Intl.DateTimeFormat('fr-FR', optionsDate).format(inputDate);
    const formattedTime = new Intl.DateTimeFormat('fr-FR', optionsTime).format(inputDate);

    return [formattedDate, formattedTime];
};

export default formatDate;

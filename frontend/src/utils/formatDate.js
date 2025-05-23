export const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleDateString('rs-RS', options);
    return formattedDate.replace(/\//g, '.');
};

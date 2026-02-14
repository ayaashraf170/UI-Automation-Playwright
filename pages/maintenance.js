class MaintenancePage {

    constructor(page) {

        this.page=page,
        this.pageTitle=page.getByRole('heading',{name:'Maintenance'})
        
    }
    
}

export {MaintenancePage}
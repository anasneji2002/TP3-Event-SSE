export class sqlHelpers 
{
    static async paginate(query : any , page : number , size :number ) : Promise<any>
    {   
        const skip = (page - 1) * size;
        return query.skip(skip).take(size).getMany();
    }
}
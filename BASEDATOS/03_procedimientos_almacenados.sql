USE TEST_FORM;
GO

IF OBJECT_ID('dbo.sp_Contactos_Consultar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Contactos_Consultar;
GO

CREATE PROCEDURE dbo.sp_Contactos_Consultar
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Id,
        RTRIM(TipoIdentificacion) AS TipoIdentificacion,
        Identificacion,
        Nombres,
        Apellido,
        Telefono,
        Direccion,
        CorreoElectronico,
        Cliente
    FROM dbo.Contactos
    ORDER BY Id DESC;
END
GO

IF OBJECT_ID('dbo.sp_Contactos_Insertar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Contactos_Insertar;
GO

CREATE PROCEDURE dbo.sp_Contactos_Insertar
    @TipoIdentificacion CHAR(3),
    @Identificacion VARCHAR(20),
    @Nombres VARCHAR(50),
    @Apellido VARCHAR(50),
    @Telefono VARCHAR(10),
    @Direccion VARCHAR(120),
    @CorreoElectronico VARCHAR(120),
    @Cliente BIT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Contactos
    (
        TipoIdentificacion,
        Identificacion,
        Nombres,
        Apellido,
        Telefono,
        Direccion,
        CorreoElectronico,
        Cliente
    )
    VALUES
    (
        @TipoIdentificacion,
        @Identificacion,
        @Nombres,
        @Apellido,
        @Telefono,
        @Direccion,
        @CorreoElectronico,
        @Cliente
    );
END
GO

IF OBJECT_ID('dbo.sp_Contactos_Editar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Contactos_Editar;
GO

CREATE PROCEDURE dbo.sp_Contactos_Editar
    @Id INT,
    @TipoIdentificacion CHAR(3),
    @Identificacion VARCHAR(20),
    @Nombres VARCHAR(50),
    @Apellido VARCHAR(50),
    @Telefono VARCHAR(10),
    @Direccion VARCHAR(120),
    @CorreoElectronico VARCHAR(120),
    @Cliente BIT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Contactos
    SET
        TipoIdentificacion = @TipoIdentificacion,
        Identificacion = @Identificacion,
        Nombres = @Nombres,
        Apellido = @Apellido,
        Telefono = @Telefono,
        Direccion = @Direccion,
        CorreoElectronico = @CorreoElectronico,
        Cliente = @Cliente
    WHERE Id = @Id;
END
GO

IF OBJECT_ID('dbo.sp_Contactos_Eliminar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Contactos_Eliminar;
GO

CREATE PROCEDURE dbo.sp_Contactos_Eliminar
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.Contactos
    WHERE Id = @Id;
END
GO

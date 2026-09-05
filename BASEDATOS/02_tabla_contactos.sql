USE TEST_FORM;
GO

IF OBJECT_ID('dbo.Contactos', 'U') IS NOT NULL
    DROP TABLE dbo.Contactos;
GO

CREATE TABLE dbo.Contactos
(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TipoIdentificacion CHAR(3) NOT NULL,
    Identificacion VARCHAR(20) NOT NULL,
    Nombres VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Telefono VARCHAR(10) NOT NULL,
    Direccion VARCHAR(120) NOT NULL,
    CorreoElectronico VARCHAR(120) NOT NULL,
    Cliente BIT NOT NULL CONSTRAINT DF_Contactos_Cliente DEFAULT (0),
    CONSTRAINT CK_Contactos_TipoIdentificacion CHECK (TipoIdentificacion IN ('CC', 'TI', 'NIT'))
);
GO
